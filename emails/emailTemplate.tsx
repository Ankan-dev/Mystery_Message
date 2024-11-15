import { Html, Head, Preview, Section,Row, Heading ,Text} from "@react-email/components";

interface creadencials{
    username:string,
    otp:string
}

export default function Email({username,otp}:creadencials){
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification Email</title>
            </Head>
            <Preview>
                Here&apos;s your Verification code:{otp} 
            </Preview>
            <Section>
                <Row>
                   <Heading>
                        Hello {username},
                    </Heading> 
                </Row>
                <Row>
                    <Text>
                        Thank You for registering, here is your Verification code: {username}
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Please do not share this code with anyone
                    </Text>
                </Row>
            </Section>
        </Html>
    );
};
