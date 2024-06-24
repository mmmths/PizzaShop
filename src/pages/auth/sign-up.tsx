import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignUp() {
  const navigate = useNavigate()

  const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
  })

  type SignUpForm = z.infer<typeof signUpForm>

  const { register, handleSubmit } = useForm<SignUpForm>()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignIn(data: SignUpForm) {
    try {
      console.log(data)
      await registerRestaurantFn({
        email: data.email,
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        phone: data.phone,
      })
      toast.success('Restaurante cadastrada com sucesso', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar restaurante')
    }
  }
  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8 ">
        <Button variant="ghost" asChild className=" absolute right-8 top-8 ">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="felx flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              ></Input>
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              ></Input>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')}></Input>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" type="text" {...register('phone')}></Input>
            </div>

            <Button className="w-full">Finalizar cadastro</Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar você concorda com nossos
              <a className="underline ring-offset-4" href="">
                {' '}
                termos de serviço
              </a>{' '}
              e
              <a className="underline ring-offset-4" href="">
                {' '}
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
