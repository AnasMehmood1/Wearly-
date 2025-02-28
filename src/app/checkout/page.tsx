"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Product {
  id: string ;
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes?: string[];
  category: string;
  quantity: number;
}

type PaymentMethod = "card" | "cash";

interface CheckoutFormData {
  cardNumber?: string;
  // Add other form fields as needed
}

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      setCartItems(storedCart);
    }
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const { register, handleSubmit, watch } = useForm<CheckoutFormData>();
  const watchedFields = watch();

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <Card>
        <CardContent className="p-4">
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between py-2 border-b">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)} x {item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold mt-4">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <Label>Payment Method</Label>
        <RadioGroup
          defaultValue="card"
          onValueChange={(value: string) => setPaymentMethod(value as PaymentMethod)}
          className="my-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card">Credit Card</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash">Cash on Delivery</Label>
          </div>
        </RadioGroup>

        {paymentMethod === "card" && (
          <div className="mt-4">
            <Label>Card Number</Label>
            <Input {...register("cardNumber")} type="text" placeholder="**** **** **** ****" />

            {watchedFields.cardNumber && (
              <p className="mt-2 text-sm">Card ending in {watchedFields.cardNumber.slice(-4)}</p>
            )}
          </div>
        )}

        <Button type="submit" className="mt-6 w-full">
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default CheckoutPage;
