import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useDispatch } from "react-redux"
import ShowToastify from "@/utils/ShowToastify"
import { useNavigate } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formSchema = z.object({
    username: z.string().min(2, {
      message: t("login.invalidUsername"),
    }),
    password: z.string().min(6, {
      message: t("login.invalidPassword")
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch({
      type: "LOGIN",
      payload: {
        data: values,
        onSuccess: () => {
          ShowToastify.showSuccessToast(t("login.success"))
          navigate("/profile")
        },
        onError: () => { ShowToastify.showErrorToast(t("login.error")) }
      },
    })
  }

  return (
    <div>
      <h1 className="text-lg mb-3">{t("login.title")}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 sm:w-full lg:w-2/4  m-auto border-2 p-3 rounded-md dark:border-rose-400">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="float-start mb-6">{t("login.username")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("login.usernamePlaceholder")} {...field} className="dark:border-rose-200" />
                </FormControl>
                <FormMessage className="text-start text-xs dark:text-rose-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="float-start mb-6">{t("login.password")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("login.passwordPlaceholder")} {...field} className="dark:border-rose-200" />
                </FormControl>
                <FormMessage className="text-start text-xs dark:text-rose-600" />
              </FormItem>
            )}
          />

          <Button type="submit" variant={"outline"}
            className="dark:bg-red-400 bg-slate-400 m-auto">
            Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Login
