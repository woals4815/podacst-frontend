import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import { loginMutation, loginMutationVariables } from '../__generated__/loginMutation';


export const LOGIN = gql`
    mutation loginMutation($loginInput: LoginInput!){
        login(input: $loginInput) {
            ok
            error
            token
        }
    }
`;

interface ILoginForm {
    email: string;
    password: string;
}

export const Login = () => {
    const {getValues, register, handleSubmit, formState, errors} = useForm<ILoginForm>({
        mode: 'onChange'
    });
    const onCompleted = (data: loginMutation) => {
        const {
            login: {ok, token}
        } = data;
        if (ok && token){
            localStorage.setItem('token', token);
            const existToken = localStorage.getItem('token');
            isLoggedInVar(Boolean(existToken));
            authTokenVar(existToken);
        }
    }
    const [loginMutation, {data: loginResult, loading, error}] = useMutation<
    loginMutation, loginMutationVariables
    >(LOGIN, {
        onCompleted
    });
    const onSubmit = async() => {
        if (!loading) {
            const {email, password} = getValues();
            await loginMutation({
                variables: {
                    loginInput: {
                        email,
                        password
                    }
                }
            });
        }
    }
    return (
        <div className="h-screen flex-col flex items-center mt-28">
            <span className="text-4xl mb-5 text-red-300">Login</span>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="grid gap-3 justify-center w-full"
            >
                <input ref={register({
                    required: "Email is required",
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
                    name="email"
                    required
                    placeholder="Email"
                    type="email"
                    className="input w-96"
                />
                {errors.email?.message && (
                    <FormError errormessage={errors.email.message} />
                )}
                {errors.email?.type === "pattern" && (
                    <FormError errormessage={'Please enter a valid email'} />
                )}
                <input 
                    ref={register({
                        required: "Password is required."
                    })}
                    required
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input"
                />
                {errors.password?.message && (
                    <FormError errormessage={errors.password.message} />
                )}
                <Button loading={loading} canClick={formState.isValid} actionText={"Log In!"} />
                {loginResult?.login.error && (
                    <FormError errormessage={loginResult.login.error} />
                )}
            </form>
            <div>
                <Link to="/create-account">
                    <span>Doens't have an account? Let's go to create</span>
                </Link>
            </div>
        </div>
    )
}