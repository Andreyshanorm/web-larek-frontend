type ProductStatus = 'софт-скил' | 'хард-скил' | 'кнопка' | 'другое' | 'дополнительное';

export enum Events {
  CATALOG_PRODUCTS = "product:changed", //все категории карточек
  HOVER_PRODUCTS = "product:hover",//наведение на карточку
  CLICK_PRODUCTS = "card:open", //клик по карточке
  OPEN_MODAL = "modal:open", //при клике на карточку открывается модальное окно
  CLOSE_MODAL = "modal:close",//приклике на крест закрывется модальное окно
  CHANGING_PRODUCT_CART = "cart:changed",//добавить продукт в корзину
  OPEN_CART = "cart:open",//открытие корзины
  DELETE_PRODUCT ="prodact:remove",//удалить продукт из корзины
  MAKING_AN_ORDER = "making-order:open",//переход к оформлению заказа
  PAYMENT_METHOD = "payment:changed",//способ оплаты
  FILLING_IN_FIELDS_WHITH_DATE = "data-field:changed",//заполнение поля данными 
  ORDER_COMPLETION = "order-completion:complete",//заказ оформлен
}

export type productId = string;

export interface IProductItem {
  id: productId;
  description: string;
  image: string;
  title: string;
  category: ProductStatus;
  price: number | null
};

type paymentType = 'online' | 'on delivery';

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

type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

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

export interface ICard extends Pick<IProductItem, 'id' | 'title' | 'price'> {
  image?: string;
  category?: ProductStatus
  description?: string;
} 

export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
  }

export interface ISuccess {
    id: string,
    total: number;
}

export interface ISuccessActions {
    onClick: () => void;
}

export interface IModalData {
    content: HTMLElement;
}
