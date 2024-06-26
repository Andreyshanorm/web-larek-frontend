# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура 

В приложении используется MVP-архитектура
![![web-larek.png]](https://github.com/Andreyshanorm/web-larek-frontend/blob/main/web-larek.png)


### Базовые классы


#### Класс `Api`
Класс `Api` имеет свойства `baseUrl` и `options`, а также методы `get` и `post`. Метод `handleResponse` используется для обработки ответов от сервера. Метод `get` выполняет GET-запрос к указанному URL, а метод `post` выполняет POST-, PUT- или DELETE-запрос в зависимости от переданного значения `method`.


#### Класс `EventEmitter`

Класс `EventEmitter` реализует интерфейс `IEvents` и имеет поле `_events`, которое является картой, содержащей события и их подписчиков. Методы `on`, `off`, `emit`, `onAll`, `offAll` и `trigger` используются для установки, удаления и инициирования событий. Метод `on` устанавливает обработчик на событие, `off` снимает обработчик с события, `emit` инициирует событие с данными, `onAll` слушает все события, `offAll` сбрасывает все обработчики, а `trigger` создает коллбек триггер, генерирующий событие при вызове.


#### Класс `Model<T>`

Абстрактный класс `Model<T>` является базовой моделью, которая отличается от простых объектов с данными. Он имеет поля `data` и `events`. Свойство `data` содержит данные модели, а `events` - объект событий. Метод `emitChanges`, используется для информирования всех подписчиков о том, что модель изменилась и вызывает метод `emit` объекта `events`, передавая ему событие и, возможно, объект данных. 
Этот класс служит базовой моделью и может быть использован для отличия простых объектов с данными от объектов, которые наследуются от `Model<T>`. 


#### Класс `Component<T>`

Абстрактный класс `Component<T>` является базовым классом, который предоставляет функционал для работы с DOM в дочерних компонентах. Он имеет поля `container` и `data`, которые используются для хранения корневого DOM-элемента и данных компонента соответственно.

Методы `toggleClass`, `setText`, `setDisabled`, `setHidden`, `setVisible`, `setImage` и `render` предоставляют инструменты для работы с DOM-элементами. Метод `toggleClass` позволяет переключать класс элемента, `setText` устанавливает текстовое содержимое элемента, `setDisabled` устанавливает состояние блокировки элемента, `setHidden` скрывает элемент, `setVisible` показывает элемент, `setImage` устанавливает изображение с альтернативным текстом, а `render` возвращает корневой DOM-элемент.


### Слой данных (Model)


#### Класс `productModel`

Класс `productModel` расширяет класс `Model<T>` и реализует интерфейс `IProductItem`.

Поля:
* `id` - уникальный идентификатор продукта
* `description` - описание продукта
* `image` - путь к изображению продукта
* `title` - название продукта
* `category` - категория продукта, является значением из перечисления ProductStatus
* `price` - цена продукта, которая может быть числом или null, если продукт не имеет цены


#### Класс `AppState`

Класс `AppState` расширяет класс `Model<T>` и реализует интерфейс `IAppState`. Класс AppState предоставляет функционал для управления приложением и его элементами: каталогом продуктов, корзиной, превью и заказом пользователя.

Поля:
* `catalog` - содержит список продуктов из каталога
* `basket` - представляет корзину пользователя, содержащую сет из идентификаторов продуктов
* `preview` - содержит идентификатор продукта, который в данный момент отображается в режиме превью
* `order` -  представляет заказ пользователя, который может быть пустым, если заказ еще не был создан
* `loading` -  указывает, происходит ли в данный момент загрузка

Методы:
* `clearBasket` - очищает корзину пользователя
* `clearOrder` - очищает корзину пользователя
* `addToBasket` -  добавляет продукт в корзину пользователя
* `removeFromBasket` - удаляет продукт из корзины пользователя
* `getStatusBasket` - возвращает количество продуктов в корзине пользователя
* `getProductsFromBasket` - возвращает список продуктов из корзины пользователя с описанием
* `getTotal` - вычисляет общую стоимость заказа пользователя
* `setCatalog` - заполняет данные каталога продуктов
* `setPreview` - заполняет данные превью продукта пользователя
* `setOrderField` - заполняет данные заказа пользователя
* `validateOrder` - проверяет поля заказа пользователя

### Слой отображения (View)


#### Интерфейс `ICard`

Интерфейс `ICard` определяет свойства карточки продукта, которые используются в классах `Card`, `CatalogCard`, `PreviewCard` и `BasketCard`. Он содержит следующие свойства:

* `id`: `string` - представляет идентификатор продукта.
* `title`: `string` - представляет название продукта.
* `price`: `number | null` -  представляет цену продукта.
* `image`: `string` - представляет URL-адрес изображения продукта.
* `category`: `ProductStatus` - представляет категорию продукта.


#### Класс `Card`

Класс `Card` является расширением класса `Component` и реализует интерфейс `ICard`. Предоставляет функционал для работы с элементами интерфейса карточки товара.
Класс `Card` является базовым классом для всех остальных классов карточек и содержит общие методы и свойства для работы с элементами интерфейса.

Поля:
* `_title` -  представляет заголовок карточки продукта.
* `_price` - представляет цену карточки продукта.
* `_image` - представляет изображение карточки продукта.
* `_category` - представляет категорию карточки продукта.
* `_description` - представляет описание карточки продукта.
* `_categoryColor` - представляет цвета категорий карточки продукта.

Методы:
* `set id` - устанавливает идентификатор карточки продукта.
* `get id` - возвращает идентификатор карточки продукта.
* `set title` - устанавливает заголовок в карточке продукта.
* `set price` - устанавливает цену в карточке продукта.
* `set image` - устанавливает изображение в карточке продукта.
* `set category` - устанавливает категорию в карточке продукта.
* `set description` - устанавливает описание в карточке продукта.


#### Класс `CatalogCard`

Класс `CatalogCard` расширяет класс `Card` и добавляет обработчик событий `onClick`, который может быть передан в конструктор.


#### Класс `PreviewCard`

Класс `PreviewCard` также расширяет класс `Card` и добавляет обработчик событий `onClick` для кнопки.


#### Класс `BasketCard`

Класс `BasketCard` также расширяет класс `Card` и добавляет обработчик событий `onClick` для кнопки удаления элемента из корзины, а также свойство `index`, которое позволяет устанавливать и получать индекс элемента в корзине.


#### Класс `Modal`

Класс `Modal` является расширением класса `Component` и реализует интерфейс `IModalData`. Предоставляет функционал для работы с модальными окнами, включая установку содержимого, открытие и закрытие окна, а также обработку событий.

Поля:
* `content` - представляет содержимое модального окна.
* `closeButton` представляет кнопку закрытия модального окна.
* `container` - представляет корневой DOM-элемент модального окна.
* `events` - представляет объект событий модального окна.

Методы:
* `open` - открывает модальное окно.
* `close` - закрывает модальное окно.
* `set content` - устанавливает содержимое модального окна.
* `render` - возвращает корневой DOM-элемент и открывает модальное окно.


#### Класс `Form`

Класс `Form` является расширением класса `Component` и реализует интерфейс `IFormState`. Предоставляет функционал для работы с формами, включая обработку изменений полей, установку состояния формы и обработку событий.

Поля:
* `valid` - определяет, является ли форма валидной.
* `errors` - представляет список ошибок формы.

Методы:
* `onInputChange` - обрабатывает изменение значения поля формы.
* `render` - возвращает корневой DOM-элемент формы и устанавливает его состояние.


#### Класс `OrderAdress`

Класс `OrderAdress` является расширением класса `Form` и предоставляет функционал для работы с первой формой заказа, в которой выбирается тип оплаты и адрес доставки.

Поля:
* `_paymentButtons` представляет массив кнопок выбора способа оплаты

Методы:
* `payment` - устанавливает выбранный способ оплаты.
* `address` -  устанавливает адрес доставки.


#### Класс `OrderContact`

Класс `OrderContact` является расширением класса `Form` и предоставляет функционал для работы с формой с контактными данными

Методы:
* `phone` - устанавливает номер телефона.
* `email` - устанавливает адрес электронной почты.


#### Класс `Success` 

Класс `Success` является расширением класса `Component` и предоставляет функционал для работы с успешным заказом. 

Поля:
* `total` - представляет общую сумму заказа.
* `_close` - представляет кнопку закрытия.

Методы: 
* `onClick` - обрабатывает событие клика на кнопке закрытия.


#### Класс `Page`

Класс `Page` является расширением класса `Component` и реализует интерфейс `IPage`. Предоставляет функционал для работы со страницей, включая установку счетчика товаров в корзине, элементов каталога и состояния блокировки страницы.

Поля:
* `counter` - счетчик товаров в корзине.
* `catalog` - массив элементов каталога.
* `locked` - определяет, заблокирована ли страница.

Методы:
* `set counter` - устанавливает значение счетчика товаров в корзине.
* `set catalog` - устанавливает элементы каталога.
* `set locked` - устанавливает, заблокирована ли страница.


### Слой представления (Presenter)

Презентер реализован 2 классами: работа с API `WebLarekAPI` и обработка событий `EventEmitter` (класс описан в разделе базовых классов). Также с помощью `enum` описан список основных событий на сайте (описан в базовых типах данных)

#### Класс `WebLarekAPI`

Класс `WebLarekAPI` является расширением класса `Api` и имеет дополнительное поле `cdn`. Конструктор класса `WebLarekAPI` принимает `cdn` и `baseUrl` в качестве аргументов и вызывает конструктор родительского класса `Api`.

Методы:
* `getProductList` использует метод `get` класса `Api` для получения списка товаров и возвращает промис с массивом товаров. 
* `getProductItem` также использует метод `get` для получения информации о товаре по его `id` и возвращает промис с объектом товара. 
* `orderProducts` использует метод `post` для размещения заказа и возвращает промис с результатом заказа.

Класс `WebLarekAPI` также использует типы и интерфейсы `ProductStatus`, `productId`, `IProductItem`, `paymentType`, `IOrderForm`, `IOrder` и `IOrderResult`.
