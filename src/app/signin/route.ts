import { API_DOMAIN, EMAIL_VERIFY_TEMPLATE_ID } from "@/config/process";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/services/mail/sendgrid";
import { createToken } from "@/utils/auth-token";
import { comparePassword } from "@/utils/password";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "missing fields - email, password" }),
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "user not found" }), {
        status: 404,
      });
    }

    if (!user.verified) {
      const verification = await prisma.verification.findUnique({
        where: {
          userId: user.id,
        },
      });
      if (verification) {
        const verificationUrl = `${API_DOMAIN}/account/verify?key=${verification.token}`;
        const mail = await sendMail({
          from: "donotreply@mavapay.co",
          to: email,
          templateId: EMAIL_VERIFY_TEMPLATE_ID,
          dynamicTemplateData: {
            url: verificationUrl,
          },
        });
        if (mail instanceof Error) {
          throw new Error(mail.message);
        }
      }
      return new Response(JSON.stringify({ error: "user not verified." }), {
        status: 403,
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: "incorrect email/password" }),
        {
          status: 401,
        }
      );
    }

    const token = await createToken({ userId: user.id.toString() });

    return new Response(JSON.stringify({ token }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server Error" }), {
      status: 500,
    });
  }
}
