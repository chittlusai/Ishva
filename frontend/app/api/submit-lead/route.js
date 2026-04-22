import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Define path and ensure directory exists
    const dirPath = path.join(process.cwd(), "data");
    const filePath = path.join(dirPath, "leads.json");
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let leads = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      leads = JSON.parse(fileContent);
    }

    const newLead = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...data,
      emailSent: true // Simulating email sent to vanapalligowtham890@gmail.com
    };

    leads.push(newLead);
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));

    // IN A REAL APP, we would use Resend/Nodemailer to send to vanapalligowtham890@gmail.com here.
    console.log(`[EMAIL SIMULATION] Sent lead to vanapalligowtham890@gmail.com:`, newLead);

    return NextResponse.json({ success: true, leadId: newLead.id }, { status: 201 });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ success: false, error: "Failed to save lead" }, { status: 500 });
  }
}
