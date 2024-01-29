import { SENDGRID_API_KEY } from "@/config/process";
import { SendMailError, parseErrorMessageFromUnknown } from "@/domain/error";
import sgMail from "@sendgrid/mail";

type SendMailOptions = {
  from: string;
  to: string;
  templateId: string;
  dynamicTemplateData?: Record<string, unknown>;
};

type SendMailResponse = {
  success: true;
};

export async function sendMail({
  from,
  to,
  templateId,
  dynamicTemplateData,
}: SendMailOptions): Promise<SendMailResponse | SendMailError> {
  try {
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to,
      from,
      templateId,
      dynamicTemplateData: {
        ...dynamicTemplateData,
      },
    };

    const [response] = await sgMail.send(msg);
    if (response.statusCode !== 202) {
      return new SendMailError(`SendMail: ${JSON.stringify(response)}`);
    }
    return { success: true };
  } catch (error) {
    console.error(`SendMail: ${JSON.stringify(error)}`);
    const errMsg = parseErrorMessageFromUnknown(error);
    return new SendMailError(errMsg);
  }
}
