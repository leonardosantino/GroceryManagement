"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  BusinessIcon,
  Row,
  Text,
  Col,
  Paper,
  Button,
  Input,
  Checkbox,
  Container,
} from "@/com/ui/comps";

import { User } from "@/model/entity/User";

import { breakpoint } from "@/com/ui/theme/scheme";
import { useSession } from "@/provider/data/SessionProvider";

import { Api } from "@/clients/Api";

export default function SignIn() {
  const { setSession } = useSession();

  const [user, setUser] = useState(User.default());

  const mutationSignin = useMutation({
    mutationFn: () => Api.users.signIn(user),
  });

  async function handleSignIn() {
    const response = await mutationSignin.mutateAsync();

    setSession(response.token);
  }

  return (
    <Container justify="center" align={"center"} testId="singin-page">
      <Paper direction={"column"} padding={3} width={breakpoint.small}>
        <Row align={"center"} justify={"center"} gap={1} padding={1}>
          <BusinessIcon />
          <Text size={"xLarge"}>Ecom Soft Co.</Text>
        </Row>
        <Col gap={3} padding={3}>
          <Input
            id="grocery-management-signin-email"
            name="grocery-management-signin-email"
            type="email"
            placeholder="Email"
            required
            fullWidth
            variant="outlined"
            onChange={(e) =>
              setUser(
                user.copy({
                  username: user.username.copy({ email: e.target.value }),
                }),
              )
            }
          />

          <Input
            id="grocery-management-signin-password"
            name="grocery-management-signin-password"
            type="password"
            placeholder="Senha"
            required
            fullWidth
            variant="outlined"
            onChange={(e) => setUser(user.copy({ password: e.target.value }))}
          />

          <Row align={"center"} gap={1}>
            <Checkbox value="remember" color="primary" />
            Lembrar-me
          </Row>

          <Button variant="contained" onClick={handleSignIn}>
            Entrar
          </Button>
        </Col>
      </Paper>
    </Container>
  );
}
