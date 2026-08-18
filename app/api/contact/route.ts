import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: "Please complete all fields." },
        { status: 400 }
      );
    }

    const inquiry = await resend.emails.send({
      from: "ELLDesign Website <onboarding@resend.dev>",

    
      to: ["info@elldesign.studio"],

      replyTo: email,

      subject: `New inquiry from ${name}`,

      html: `
        <div style="
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.6;
          color: #111;
        ">
          <h2>New ELLDesign Inquiry</h2>

          <p>
            <strong>Name</strong><br />
            ${name}
          </p>

          <p>
            <strong>Email</strong><br />
            ${email}
          </p>

          <p>
            <strong>Message</strong><br />
            ${message}
          </p>
        </div>
      `,
    });

    if (inquiry.error) {
      console.error("Inquiry email error:", inquiry.error);

      return Response.json(
        { error: "Unable to send message." },
        { status: 500 }
      );
    }

    /*
      AUTO-REPLY TO VISITOR

      先暂时注释掉。
      等我们确认你们自己的发送域名之后再开启，
      否则 onboarding@resend.dev 在测试阶段会有限制。
    */

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Contact route error:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
