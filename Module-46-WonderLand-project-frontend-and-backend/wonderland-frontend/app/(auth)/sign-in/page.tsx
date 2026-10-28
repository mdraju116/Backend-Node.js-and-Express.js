"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import toast from "react-hot-toast"

import { SocialSignInButtons } from "@/components/social-sign-in-buttons"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import { signIn } from "@/lib/auth-client"

type SignInErrors = {
  email?: string
  password?: string
}

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

function validateEmail(email: string) {
  if (!email) return "Email is required"
  if (!EMAIL_PATTERN.test(email)) return "Please enter a valid email address"
  return undefined
}

function validatePassword(password: string) {
  if (!password) return "Password is required"
  return undefined
}

const SignInForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestedCallback = searchParams.get("callbackURL")
  const callbackURL =
    requestedCallback?.startsWith("/") && !requestedCallback.startsWith("//")
      ? requestedCallback
      : "/"

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(true)
  const [errors, setErrors] = React.useState<SignInErrors>({})
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Show a hint when the user was redirected here from a protected page
  React.useEffect(() => {
    const message = searchParams.get("message")

    if (message === "booking-required") {
      toast("Please sign in to book this information", {
        id: "booking-required",
        icon: "🔐",
      })
    } else if (message === "login-required") {
      toast("Please sign in to view this information.", {
        id: "login-required",
        icon: "🔐",
      })
    }
  }, [searchParams])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSubmitting) return

    const nextErrors: SignInErrors = {
      email: validateEmail(email.trim()),
      password: validatePassword(password),
    }

    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) return

    setIsSubmitting(true)

    try {
      const { error } = await signIn.email({
        email: email.trim(),
        password,
        rememberMe,
        callbackURL,
      })

      if (error) {
        console.error("Sign-in error:", error)
        toast.error(error.message || "Could not sign in. Please try again.")
        return
      }

      toast.success("Signed in successfully!")
      router.push(callbackURL)
      router.refresh()
    } catch (error) {
      console.error("Sign-in error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-12">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold sm:text-2xl">
            Sign in
          </CardTitle>
          <CardDescription>
            Log in to see detailed prices, compare packages and view your
            profile.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
            <FieldGroup>
              {/* Email */}
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors((prev) => ({ ...prev, email: undefined }))
                  }}
                  aria-invalid={!!errors.email}
                />
                <FieldError>{errors.email}</FieldError>
              </Field>

              {/* Password */}
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setErrors((prev) => ({ ...prev, password: undefined }))
                    }}
                    aria-invalid={!!errors.password}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      aria-label={
                        isPasswordVisible ? "Hide password" : "Show password"
                      }
                      onClick={() => setIsPasswordVisible((prev) => !prev)}
                    >
                      {isPasswordVisible ? <EyeOff /> : <Eye />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldError>{errors.password}</FieldError>
              </Field>
            </FieldGroup>

            {/* Remember me */}
            <label className="flex w-fit items-center gap-2 text-sm font-medium select-none">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              Remember me
            </label>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#068a3f] font-semibold text-white hover:bg-[#057536]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <Separator />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                or continue with
              </span>
            </div>

            {/* Social sign-in */}
            <SocialSignInButtons />

            {/* Sign-up link */}
            <p className="flex flex-wrap justify-center gap-1 text-sm">
              <span className="text-muted-foreground">
                Don&apos;t have an account?
              </span>
              <Link
                href="/sign-up"
                className="font-medium text-[#068a3f] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Back to home */}
      <Link
        href="/"
        className="mt-5 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>
    </main>
  )
}

const SignInPage = () => {
  return (
    <React.Suspense fallback={<main className="w-full max-w-md px-4 py-12" />}>
      <SignInForm />
    </React.Suspense>
  )
}

export default SignInPage
