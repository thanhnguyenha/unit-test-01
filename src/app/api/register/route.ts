import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.JSON_SERVER_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username và password là bắt buộc' },
        { status: 400 }
      );
    }

    // Kiểm tra username đã tồn tại chưa
    const checkUserResponse = await fetch(`${API_URL}/users?username=${username}`);
    const existingUsers = await checkUserResponse.json();

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Tên đăng nhập đã tồn tại' },
        { status: 409 }
      );
    }

    // Tạo user mới
    const newUser = {
      username,
      password, // Trong thực tế nên hash password
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Không thể tạo tài khoản' },
        { status: 500 }
      );
    }

    const user = await response.json();
    
    // Không trả về password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: 'Đăng ký thành công', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}
