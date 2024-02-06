// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { Input } from "@/components/ui/input"
// import { z } from "zod"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// const CustomInput = ({ name: string, errors: [], label: string, placeHolder: string }) => {
//     const formSchema = z.object({
//         username: z.string().min(2, {
//             message: t("login.invalidUsername"),
//         }),
//         password: z.string().min(6, {
//             message: t("login.invalidPassword")
//         }),
//     })

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             username: "",
//             password: "",
//         },
//     })

//     return (
//         <FormField
//             control={form.control}
//             name={String(name)}
//             render={({ field }) => (
//                 <FormItem>
//                     <FormLabel className="float-start mb-6">{label}</FormLabel>
//                     <FormControl>
//                         <Input placeholder={placeHolder} {...field} className="dark:border-rose-200" />
//                     </FormControl>
//                     <FormMessage className="text-start text-xs dark:text-rose-600" />
//                 </FormItem>
//             )}
//         />
//     )
// }

// export default CustomInput
