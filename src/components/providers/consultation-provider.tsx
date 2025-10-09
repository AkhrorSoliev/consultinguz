"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Role = "Employer" | "Job Seeker";

type ConsultationContextValue = {
  open: () => void;
  close: () => void;
};

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role>("Employer");

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder submit — can be wired to an API or email service
    console.log({ name, phone, role });
    setIsOpen(false);
  }

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle>Bepul maslahat</DialogTitle>
            <DialogDescription>
              O&apos;zingiz haqingizda qisqacha yozing, tez orada bog&apos;lanamiz.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4" aria-label="Free Consultation Form">
            <div className="grid gap-2">
              <Label htmlFor="name">Ism</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-required="true"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefon raqami</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                aria-required="true"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Rol</Label>
              <select
                id="role"
                name="role"
                className="h-9 px-3 rounded-md border bg-background"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                aria-label="Select role"
              >
                <option>Ish beruvchi</option>
                <option>Ish izlovchi</option>
              </select>
            </div>
            <DialogFooter>
              <Button type="submit">
                <Send className="size-4" />
                <span>Yuborish</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) throw new Error("useConsultation must be used within ConsultationProvider");
  return ctx;
}
