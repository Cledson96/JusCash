import { BackgroundAuth, Card, AuthContainer } from "../components";

export default function Auth() {
  return (
    <BackgroundAuth>
      <Card>
        <AuthContainer />
      </Card>
    </BackgroundAuth>
  );
}
