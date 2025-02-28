"use client"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck, CheckCircle } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
type CheckoutStep = "shipping" | "payment" | "review"
type PaymentMethod = "card" | "paypal" | "cash"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  sizes?: string[]
  category: string
  quantity: number
}

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalcode: string;
  cardNumber?: string; // Optional if not always required
  expiryDate?: string; // Optional if not always required
  cvv?: string; // Optional if not always required
}

const CheckoutPage = () => {
  const [step, setStep] = useState<CheckoutStep>("shipping")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const cartItems: Product[] = JSON.parse(localStorage.getItem("cartItems") || "[]")

  // ✅ Fixed: Ensure reduce starts with `0`, not a `Product`
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const shipping = 10
  const total = subtotal + shipping

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>()

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    if (step === "shipping") setStep("payment")
    else if (step === "payment") setStep("review")
    else {
      console.log("Order placed!", data)
      setOrderPlaced(true)
    }
  }

  const watchedFields = watch()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      {cartItems.length > 0 ? (
    <div className="flex flex-col gap-3 py-2">
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <div className="h-16 w-16 overflow-hidden rounded-md border bg-gray-100">
            <Image
              src={item.image || "/placeholder.svg?height=64&width=64"}
              alt={item.name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-medium">{item.name}</h4>
            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
          </div>
          <div className="text-sm font-medium">${item.price.toFixed(2)}</div>
        </div>
      ))}
    </div>
  ) : (
    <p>No items in the cart.</p>
  )}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <div className="flex justify-between mb-8">
            <div className="flex items-center">
              <div className={`rounded-full p-2 ${step === "shipping" ? "bg-black text-white" : "bg-gray-200"}`}>
                <Truck size={24} />
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className="flex items-center">
              <div className={`rounded-full p-2 ${step === "payment" ? "bg-black text-white" : "bg-gray-200"}`}>
                <CreditCard size={24} />
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
            <div className="flex items-center">
              <div className={`rounded-full p-2 ${step === "review" ? "bg-black text-white" : "bg-gray-200"}`}>
                <CheckCircle size={24} />
              </div>
              <span className="ml-2 font-medium">Review</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === "shipping" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...register("firstName", { required: true })} />
                    {errors.firstName && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...register("lastName", { required: true })} />
                    {errors.lastName && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" {...register("address", { required: true })} />
                  {errors.address && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
   <div className="grid grid-cols-2 gap-4">
                 <div>
                  <Label htmlFor="address">City</Label>
                  <Input id="address" {...register("city", { required: true })} />
                  {errors.address && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div>
                  <Label htmlFor="address">postalcode</Label>
                  <Input id="address" {...register("postalcode", { required: true })} />
                  {errors.address && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                </div>
                
              </>
            )}
 {step === "payment" && (
              <>
                <RadioGroup defaultValue="card" onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
                {paymentMethod === "card" && (
                  <>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" {...register("cardNumber", { required: paymentMethod === "card" })} />
                      {errors.cardNumber && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" {...register("expiryDate", { required: paymentMethod === "card" })} />
                        {errors.expiryDate && <span className="text-red-500 text-sm">This field is required</span>}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" {...register("cvv", { required: paymentMethod === "card" })} />
                        {errors.cvv && <span className="text-red-500 text-sm">This field is required</span>}
                      </div>
                    </div>
                  </>
                )}
                {paymentMethod === "paypal" && (
                  <p className="text-sm text-gray-600">
                    You will be redirected to PayPal to complete your purchase securely.
                  </p>
                )}
                {paymentMethod === "cash" && (
                  <p className="text-sm text-gray-600">You will pay in cash when your order is delivered.</p>
                )}
              </>
            )}

            {step === "review" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Order Review</h2>

                <div className="bg-gray-100 p-6 rounded-lg space-y-4">
                  <h3 className="text-lg font-medium">Shipping Details</h3>
                  <p>{watchedFields.firstName} {watchedFields.lastName}</p>
                  <p>{watchedFields.address}</p>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg space-y-4">
                  <h3 className="text-lg font-medium">Order Items</h3>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} ({item.quantity})</span>
                      <span>${item.price * item.quantity}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full">
              {step === "review" ? "Place Order" : "Continue"}
            </Button>
          </form>
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-gray-100 p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={orderPlaced} onOpenChange={setOrderPlaced}>
     <DialogContent>
       <DialogHeader>
         <DialogTitle>Order Placed Successfully!</DialogTitle>
         <DialogDescription>
           Thank you for your purchase. Your order has been received and is being processed. You will receive a
           confirmation email shortly.
         </DialogDescription>
       </DialogHeader>
       <Button onClick={() => setOrderPlaced(false)}>Close</Button>
     </DialogContent>
   </Dialog>
    </div>
    
  )
}

export default CheckoutPage