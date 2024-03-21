export type ProductStatus = 'софт-скил' | 'хард-скил' | 'кнопка' | 'другое' | 'дополнительное';

export type productId = string;

export interface IProductItem {
  id: productId;
  description: string;
  image: string;
  title: string;
  category: ProductStatus;
  price: number | null
};

export type paymentType = 'online' | 'on delivery';

export interface IOrderAdress {
  payment: paymentType;
  address: string
};

export interface IOrderContact {
  email: string;
  phone: string
};
export type IOrderForm = IOrderAdress & IOrderContact;

export interface IOrder extends IOrderForm {
  items: productId[];
  total: number
};

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
  id: string;
  total: number
};

export interface IAppState {
  catalog: IProductItem[];
  basket: productId[];
  preview: productId | null;
  order: IOrder | null;
  loading: boolean;
};

export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

type EventName = string | RegExp;
type Subscriber = Function;
type EmitterEvent = {
    eventName: string,
    data: unknown
};

export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export interface ICard {
  id: string;
  title: string;
  price: number | null
  image?: string;
  category?: ProductStatus;
  description?: string;
}

export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
  }

export interface ISuccess {
    total: number;
}

export interface ISuccessActions {
    onClick: () => void;
}

export interface IModalData {
    content: HTMLElement;
}

export interface ISuccess {
    total: number;
}

export interface ISuccessActions {
    onClick: () => void;
}