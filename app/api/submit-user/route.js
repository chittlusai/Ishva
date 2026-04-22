import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.json();
    
    const dirPath = path.join(process.cwd(), "data");
    const filePath = path.join(dirPath, "users.json");
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let users = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      users = JSON.parse(fileContent);
    }

    // Check if user exists (by email) to update, otherwise insert
    const existingIndex = users.findIndex(u => u.email === data.email);
    
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...data, lastUpdate: new Date().toISOString() };
    } else {
      users.push({
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...data
      });
    }

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ success: false, error: "Failed to save user profile" }, { status: 500 });
  }
}
