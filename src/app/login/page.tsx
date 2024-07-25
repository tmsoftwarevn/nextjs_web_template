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
    useEffect(() => {
        const check = window.localStorage.getItem('tk');
        if (check) {
            route.push('/admin');
        }
    }, []);

    const callLogin = async (login: any) => {
        const res = await fetch(`${process.env.URL_BACKEND}/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: login.name, password: login.password }),
        });

        const result = await res.json();
        if (result && result.EC == 1) {
            message.success('Đăng nhập thành công')
            localStorage.setItem('tk','fsdf');
            route.push("/admin");
        }
        else{
            message.error('Tài khoản hoặc mật khẩu không chính xác')
        }
        console.log('rrrr', result)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        if (!data.get("email")) {
            setOpen(true);
            return;
        }
        if (!data.get("password")) {
            setOpen(true);
            return;
        }
        const login = {
            name: data.get("email"),
            password: data.get("password"),
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
                            ĐĂNG NHẬP
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
                                label="Mật khẩu"
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
