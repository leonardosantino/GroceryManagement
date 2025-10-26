"use client";

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

export default function SignIn() {
  return (
    <Col flex={1} justify="center" align={"center"}>
      <Paper direction={"column"} padding={1} width={breakpoint.small}>
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
          />

          <Input
            id="grocery-management-signin-password"
            name="grocery-management-signin-password"
            type="password"
            placeholder="Senha"
            required
            fullWidth
            variant="outlined"
          />

          <Row align={"center"} gap={1}>
            <Checkbox value="remember" color="primary" />
            Lembrar-me
          </Row>

          <Button variant="contained">Sign in</Button>
        </Col>
      </Paper>
    </Col>
  );
}
