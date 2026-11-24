import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ShoppingCart,
  UserRound,
  Plus,
  Minus,
  X,
  Check,
  Clock3,
  MapPin,
  Flame,
  Leaf,
  Truck,
  Instagram,
} from "lucide-react";
import margherita from "./assets/pizza-margherita.png";
import pepperoni from "./assets/pizza-pepperoni.png";
import fourCheese from "./assets/pizza-four-cheese.png";
import hamMushroom from "./assets/pizza-ham-mushroom.png";

type Pizza = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  ingredients: { name: string; className: string }[];
};

const pizzas: Pizza[] = [
  {
    id: 1,
    name: "Маргарита",
    price: 549,
    description: "Томатный соус, моцарелла, свежий базилик",
    image: margherita,
    ingredients: [
      { name: "Моцарелла", className: "ingredient--mozzarella" },
      { name: "Базилик", className: "ingredient--basil" },
      { name: "Томатный соус", className: "ingredient--sauce" },
      { name: "Оливковое масло", className: "ingredient--oil" },
    ],
  },
  {
    id: 2,
    name: "Пепперони",
    price: 599,
    description: "Томатный соус, моцарелла, пикантная пепперони",
    image: pepperoni,
    ingredients: [
      { name: "Моцарелла", className: "ingredient--mozzarella" },
      { name: "Пепперони", className: "ingredient--basil" },
      { name: "Томатный соус", className: "ingredient--sauce" },
      { name: "Орегано", className: "ingredient--oil" },
    ],
  },
  {
    id: 3,
    name: "Четыре сыра",
    price: 649,
    description: "Моцарелла, дорблю, пармезан и чеддер",
    image: fourCheese,
    ingredients: [
      { name: "Моцарелла", className: "ingredient--mozzarella" },
      { name: "Дорблю", className: "ingredient--basil" },
      { name: "Пармезан", className: "ingredient--sauce" },
      { name: "Чеддер", className: "ingredient--oil" },
    ],
  },
  {
    id: 4,
    name: "Ветчина и грибы",
    price: 599,
    description: "Ветчина, шампиньоны, моцарелла и сливочный соус",
    image: hamMushroom,
    ingredients: [
      { name: "Моцарелла", className: "ingredient--mozzarella" },
      { name: "Ветчина", className: "ingredient--basil" },
      { name: "Шампиньоны", className: "ingredient--sauce" },
      { name: "Сливочный соус", className: "ingredient--oil" },
    ],
  },
];

type CartLine = { pizza: Pizza; quantity: number };

function formatPrice(price: number) {
  return `${price.toLocaleString("ru-RU")} ₽`;
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");

  const activePizza = pizzas[activeIndex];
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.pizza.price * item.quantity, 0),
    [cart],
  );

  const addToCart = (pizza: Pizza) => {
    setCart((current) => {
      const exists = current.find((item) => item.pizza.id === pizza.id);
      if (exists)
        return current.map((item) =>
          item.pizza.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      return [...current, { pizza, quantity: 1 }];
    });
    setToast(`${pizza.name} добавлена в корзину`);
    window.setTimeout(() => setToast(""), 2400);
  };

  const changeQuantity = (id: number, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.pizza.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const goToMenu = () =>
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  const next = () => setActiveIndex((index) => (index + 1) % pizzas.length);
  const previous = () =>
    setActiveIndex((index) => (index - 1 + pizzas.length) % pizzas.length);

  return (
    <div className="site-shell">
      <header className="header">
        <a className="brand" href="#top" aria-label="NewFastPizza — на главную">
          <span className="brand-mark">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>
            NewFast<span>Pizza</span>
          </span>
        </a>
        <nav className="nav" aria-label="Основная навигация">
          <a href="#menu">Меню</a>
          <a href="#delivery">Доставка</a>
          <a href="#delivery">Отслеживание</a>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button account-button"
            aria-label="Личный кабинет"
            onClick={() =>
              setToast("Личный кабинет появится на следующем этапе")
            }
          >
            <UserRound size={20} strokeWidth={1.8} />
          </button>
          <button
            className="cart-button"
            aria-label={`Корзина, товаров: ${cartCount}`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart size={20} strokeWidth={1.8} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            {/* <p className="eyebrow">NEWFASTPIZZA · НИЧЕГО ЛИШНЕГО</p> */}
            <h1>
              Хорошая пицца.
              <br />
              Ничего лишнего.
            </h1>
            <p className="hero-description">
              Готовим из свежих ингредиентов.
              <br />
              Привозим горячей — прямо к вашей двери.
            </p>
            <button className="primary-button hero-cta" onClick={goToMenu}>
              Заказать <ArrowRight size={21} />
            </button>
          </div>

          <div className="hero-visual" key={activePizza.id}>
            <div className="pizza-glow" />
            <img
              className="hero-pizza"
              src={activePizza.image}
              alt={`Пицца ${activePizza.name}`}
            />
            {activePizza.ingredients.map((ingredient, index) => (
              <div
                className={`ingredient ${ingredient.className}`}
                key={`${activePizza.id}-${index}`}
              >
                <span className="ingredient-dot" />
                <span className="ingredient-line" />
                <span className="ingredient-name">{ingredient.name}</span>
              </div>
            ))}
          </div>

          <div className="hero-carousel">
            <button
              className="carousel-arrow"
              aria-label="Предыдущая пицца"
              onClick={previous}
            >
              <ArrowLeft size={19} />
            </button>
            <div className="carousel-items">
              {pizzas.map((pizza, index) => (
                <button
                  className={`carousel-item ${index === activeIndex ? "is-active" : ""}`}
                  key={pizza.id}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={index === activeIndex}
                >
                  <img src={pizza.image} alt="" />
                  <span>{pizza.name}</span>
                </button>
              ))}
            </div>
            <button
              className="carousel-arrow"
              aria-label="Следующая пицца"
              onClick={next}
            >
              <ArrowRight size={19} />
            </button>
          </div>
          <div className="slide-dots" aria-label="Выбор слайда">
            {pizzas.slice(0, 4).map((pizza, index) => (
              <button
                key={pizza.id}
                aria-label={`Показать ${pizza.name}`}
                className={index === activeIndex ? "active" : ""}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </section>

        <section className="menu-section section-wrap" id="menu">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ВЫБИРАЙТЕ ЛЮБИМОЕ</p>
              <h2>Популярные пиццы</h2>
            </div>
          </div>
          <div className="pizza-grid">
            {pizzas.map((pizza) => (
              <article className="pizza-card" key={pizza.id}>
                <button
                  className="pizza-card-image"
                  onClick={() =>
                    setActiveIndex(
                      pizzas.findIndex((item) => item.id === pizza.id),
                    )
                  }
                  aria-label={`Посмотреть ${pizza.name}`}
                >
                  <img src={pizza.image} alt={pizza.name} />
                </button>
                <div className="pizza-card-info">
                  <div>
                    <h3>{pizza.name}</h3>
                    <p>{pizza.description}</p>
                  </div>
                  <div className="pizza-card-bottom">
                    <strong>{formatPrice(pizza.price)}</strong>
                    <button
                      className="small-add-button"
                      onClick={() => addToCart(pizza)}
                    >
                      <Plus size={15} /> В корзину
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="delivery-section" id="delivery">
          <div className="delivery-inner">
            <div>
              <p className="eyebrow">ОТ ПЕЧИ ДО ДВЕРИ</p>
              <h2>
                Горячая пицца.
                <br />
                Без лишнего ожидания.
              </h2>
              <p className="delivery-text">
                Оформите заказ онлайн — мы приготовим его в одном филиале и
                передадим курьеру.
              </p>
            </div>
            <div className="delivery-points">
              <div className="delivery-point">
                <span>
                  <Clock3 />
                </span>
                <div>
                  <b>Готовим после заказа</b>
                  <small>Свежая пицца, а не заготовка</small>
                </div>
              </div>
              <div className="delivery-point">
                <span>
                  <MapPin />
                </span>
                <div>
                  <b>Понятная доставка</b>
                  <small>Укажите адрес или точку на карте</small>
                </div>
              </div>
              <div className="delivery-point">
                <span>
                  <Truck />
                </span>
                <div>
                  <b>Следите за заказом</b>
                  <small>Статус и курьер будут на карте</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="promise-section section-wrap">
          <p className="eyebrow">НАШ ПОДХОД</p>
          <h2>
            Меньше обещаний.
            <br />
            <span>Больше настоящей пиццы.</span>
          </h2>
          <div className="promise-tags">
            <span>
              <Leaf size={16} /> Свежие ингредиенты
            </span>
            <span>
              <Flame size={16} /> Из печи
            </span>
            <span>
              <Check size={16} /> Ничего лишнего
            </span>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>
            NewFast<span>Pizza</span>
          </span>
        </a>
        <p>Хорошая пицца. Ничего лишнего.</p>
        <span className="footer-copy">© 2026 NewFastPizza</span>
      </footer>

      {toast && (
        <div className="toast">
          <Check size={17} />
          {toast}
        </div>
      )}

      {cartOpen && (
        <div
          className="drawer-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCartOpen(false);
          }}
        >
          <aside className="cart-drawer" aria-label="Корзина">
            <div className="drawer-heading">
              <div>
                <p className="eyebrow">ВАШ ВЫБОР</p>
                <h2>
                  Корзина <span>({cartCount})</span>
                </h2>
              </div>
              <button
                className="close-button"
                onClick={() => setCartOpen(false)}
                aria-label="Закрыть"
              >
                <X />
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingCart size={34} />
                <h3>Пока здесь пусто</h3>
                <p>Добавьте пиццу из меню — и она появится здесь.</p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setCartOpen(false);
                    goToMenu();
                  }}
                >
                  Перейти в меню <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-lines">
                  {cart.map((item) => (
                    <div className="cart-line" key={item.pizza.id}>
                      <img src={item.pizza.image} alt="" />
                      <div className="cart-line-main">
                        <b>{item.pizza.name}</b>
                        <small>30 см · классическое тесто</small>
                        <strong>
                          {formatPrice(item.pizza.price * item.quantity)}
                        </strong>
                      </div>
                      <div className="quantity-control">
                        <button
                          aria-label="Уменьшить количество"
                          onClick={() => changeQuantity(item.pizza.id, -1)}
                        >
                          <Minus size={13} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          aria-label="Увеличить количество"
                          onClick={() => changeQuantity(item.pizza.id, 1)}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <span>Итого</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <button
                  className="primary-button checkout-button"
                  onClick={() =>
                    setToast(
                      "Оформление заказа будет добавлено на следующем этапе",
                    )
                  }
                >
                  Перейти к оформлению <ArrowRight size={18} />
                </button>
                <p className="demo-note">
                  Сейчас работает демонстрационная корзина главной страницы.
                </p>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
