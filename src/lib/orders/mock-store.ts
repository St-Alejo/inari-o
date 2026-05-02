export type OrderStatus =
  | "procesando"
  | "verificando"
  | "preparando"
  | "enviado"
  | "entregado";

export type OrderItem = {
  name: string;
  variant?: string;
  color?: string;
  quantity: number;
  price: number;
  image: string;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  shippingCost: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  wompiId?: string;
  timeline: Array<{ status: OrderStatus; label: string; date: string; done: boolean }>;
};

const STORAGE_KEY = "inariño_orders";

function generateId(): string {
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `INN-${ymd}-${rand}`;
}

function estimatedDelivery(city: string): string {
  const days = city.toLowerCase() === "pasto" ? 1 : city === "Nacional" ? 5 : 3;
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  procesando: "Pedido recibido",
  verificando: "Verificando pago",
  preparando: "Preparando envío",
  enviado: "En camino",
  entregado: "Entregado",
};

function buildTimeline(status: OrderStatus): Order["timeline"] {
  const statuses: OrderStatus[] = ["procesando", "verificando", "preparando", "enviado", "entregado"];
  const idx = statuses.indexOf(status);
  const now = new Date().toLocaleDateString("es-CO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  return statuses.map((s, i) => ({
    status: s,
    label: STATUS_LABELS[s],
    date: i <= idx ? now : "",
    done: i <= idx,
  }));
}

function load(): Record<string, Order> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function save(orders: Record<string, Order>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function createOrder(
  params: Omit<Order, "id" | "status" | "createdAt" | "estimatedDelivery" | "timeline">
): Order {
  const id = generateId();
  const order: Order = {
    ...params,
    id,
    status: "procesando",
    createdAt: new Date().toLocaleDateString("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    estimatedDelivery: estimatedDelivery(params.customer.city),
    timeline: buildTimeline("procesando"),
  };
  const orders = load();
  orders[id] = order;
  save(orders);
  return order;
}

export function getOrder(id: string): Order | null {
  const orders = load();
  return orders[id] ?? null;
}

export function advanceStatus(id: string): Order | null {
  const orders = load();
  const order = orders[id];
  if (!order) return null;
  const sequence: OrderStatus[] = ["procesando", "verificando", "preparando", "enviado", "entregado"];
  const idx = sequence.indexOf(order.status);
  if (idx < sequence.length - 1) {
    order.status = sequence[idx + 1];
    order.timeline = buildTimeline(order.status);
    orders[id] = order;
    save(orders);
  }
  return order;
}
