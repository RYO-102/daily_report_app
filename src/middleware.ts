import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/admin/:path*'], // このファイルは /admin 以下のページでのみ動く
};

export function middleware(req: NextRequest) {
  // ブラウザが送ってきた認証情報（ID:パスワード）を取得
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    // 認証情報は "Basic base64文字" の形式なので、中身を取り出す
    const authValue = basicAuth.split(' ')[1];
    // Base64を解読して "user:password" の形式にする
    const [user, pwd] = atob(authValue).split(':');

    // 環境変数に設定したID・パスワードと一致するかチェック
    if (
      user === process.env.ADMIN_USER &&
      pwd === process.env.ADMIN_PASSWORD
    ) {
      // 合っていれば通す
      return NextResponse.next();
    }
  }

  // 認証がない、または間違っている場合は、入力画面を出す
  return new NextResponse('Auth Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}