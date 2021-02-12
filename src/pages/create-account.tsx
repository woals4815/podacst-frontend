import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import { createAccount, createAccountVariables } from '../__generated__/createAccount';
import { UserRole } from '../__generated__/globalTypes';

export const CREATE_ACCOUNT = gql`
    mutation createAccount($input: CreateUserInput!){
        createUser(input: $input){
            ok
            error
        }
    }
`;
interface ICreateAccountForm {
    email: string;
    password: string;
    role: UserRole;
    name: string;
}

export const CreateAccount = () => {
    const {getValues, handleSubmit, errors, register, formState} = useForm<ICreateAccountForm>({
        mode: 'onChange',
        defaultValues: {
            role: UserRole.Client,
        },
    });
    const history = useHistory();
    const onCompleted = (data: createAccount) => {
        const { 
            createUser: { ok } 
        } = data;
        if (ok) {
            alert("Account created! Login now 👊");
            history.push('/');
        }
    }
    const [createMutation, {data: createResult, error, loading}] = useMutation<createAccount, createAccountVariables>(CREATE_ACCOUNT, {
        onCompleted
    })
    const onSubmit = async() => {
        if (!loading) {
            const {email, password, role, name} = getValues();
            await createMutation({
                variables: {
                    input: {
                        email,
                        password,
                        role,
                        name
                    }
                }
            });
            console.log(error);
        }
    }
    return (
        <div className="h-screen flex flex-col items-center mt-28">
            <span className="text-4xl mb-5 text-red-300">Create Account</span>
            <form onSubmit={handleSubmit(onSubmit)}
                className="grid gap-2"
            >
                <input 
                    ref={register({
                        required: "Email is required.",
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                    type='email'
                    name='email'
                    className="input w-96"
                    required
                    placeholder="Email"
                />
                {errors.email?.message && (
                    <FormError errormessage={errors.email.message} />
                )}
                {errors.email?.type === 'pattern' && (
                    <FormError errormessage={"Please enter a vaild."} />
                )}
                <input 
                    ref={register({
                        required: "Password is required."
                    })}
                    type="password"
                    name='password'
                    className='input'
                    required
                    placeholder="Password"
                />
                {errors.password?.message && (
                    <FormError errormessage={errors.password?.message} />
                )}
                <input 
                    ref={register({
                        required: "Name is required."
                    })}
                    name='name'
                    type='name'
                    className="input"
                    required
                    placeholder="Write your Nickname"
                />
                <select
                    name='role'
                    ref={register({
                        required: true
                    })}
                    className="input"
                >
                    {Object.keys(UserRole).map((role, index) => (
                        <option key={index}>{role}</option>
                    ))}
                </select>
                <Button
                    loading={loading}
                    canClick={formState.isValid}
                    actionText={"Create Account"}
                />
                {createResult?.createUser.error && (
                    <FormError errormessage={createResult.createUser.error} />
                )}
            </form>
        </div>
    )
}