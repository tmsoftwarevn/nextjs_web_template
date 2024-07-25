"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import HomeIcon from "@mui/icons-material/Home";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

const defaultTheme = createTheme();
import { message } from 'antd';

export default function SignIn() {
    const [open, setOpen] = React.useState(false);
    const route = useRouter();


    const callLogin = async (login: any) => {
        const res = await fetch(`${process.env.URL_BACKEND}/api/v1/changepassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: login.name,
                password: login.password,
                new_password: login.new_password
            }),
        });

        const result = await res.json();
        if (result && result.EC == 1) {
            message.success('Đổi mật khẩu thành công')
            route.push("/login");
        }
        else {
            message.error('Thất bại. Hãy thử lại !')
        }
        console.log('rrrr', result)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const login = {
            name: data.get("email"),
            password: data.get("password"),
            new_password: data.get("new_password"),
        };

        callLogin(login);

    };

    return (
        <div className="login">
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "#2196f3" }}>
                            <HomeIcon
                                className="cursor-pointer"
                                onClick={() => route.push("/")}
                            />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            ĐỔI MẬT KHẨU
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate={false}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu cũ"
                                type="password"
                                id="password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="new_password"
                                label="Mật khẩu mới"
                                type="password"
                                id="password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Đăng nhập
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
