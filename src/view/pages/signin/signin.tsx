"use client";

import { Api } from "@/clients/Api";
import {
  BusinessRounded,
  Row,
  Text,
  Col,
  Paper,
  Button,
  Input,
  Checkbox,
} from "@/com/ui/comps";

import { breakpoint } from "@/com/ui/schema/scheme";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "@/model/entity/User";

import { useSession } from "@/provider/data/SessionProvider";

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
    <Col flex={1} justify="center" align={"center"} height={"inherit"}>
      <Paper direction={"column"} padding={3} width={breakpoint.small}>
        <Row align={"center"} justify={"center"} gap={1} padding={1}>
          <BusinessRounded />
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
    </Col>
  );
}
