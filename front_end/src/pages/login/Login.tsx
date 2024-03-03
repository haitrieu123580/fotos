import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useDispatch } from "react-redux"
import ShowToastify from "@/utils/ShowToastify"
import { useNavigate } from "react-router-dom"
import GoogleIcon from "@/components/common/icons/GoogleIcon"
import { loginAction } from "@/redux/auth/slice"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { routerPaths } from "@/routes/path"
const BACKEND_URL = import.meta.env.VITE_API_URL;

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
    dispatch(loginAction({
      data: values,
      onSuccess: () => {
        ShowToastify.showSuccessToast(t("login.success"))
        navigate(routerPaths.PROFILE);
      },
      onError: () => {
        ShowToastify.showErrorToast(t("login.error"))
      }
    }));
  }

  const googleAuth = () => {
    window.open(`${BACKEND_URL}/passport/google`, "_self");
  }

  return (
    <div className='sm:w-full lg:w-2/4  m-auto  border-2 p-3 rounded-md dark:border-rose-400'>
      <h1 className="text-lg mb-3">{t("login.title")}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 my-2">
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
                  <Input type="password" placeholder={t("login.passwordPlaceholder")} {...field} className="dark:border-rose-200" />
                </FormControl>
                <FormMessage className="text-start text-xs dark:text-rose-600" />
              </FormItem>
            )}
          />

          <Button type="submit" variant={"outline"}
            className="dark:bg-red-400 bg-slate-400 my-2">
            Submit</Button>
        </form>
      </Form>
      <div className="w-3/4 h-0.5 m-auto border-b-2 border-b-slate-500 dark:border-b-rose-300 border-dashed"></div>
      <Button
        type="button"
        variant={"outline"}
        onClick={() => { googleAuth() }}
        className="dark:bg-red-400 bg-white my-2 text-rose-500 dark:text-white">
        <GoogleIcon /> <span className="ml-2">Sign in with Google</span>
      </Button>

    </div>
  )
}

export default Login
