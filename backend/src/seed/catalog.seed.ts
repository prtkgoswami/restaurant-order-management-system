import { Catalog } from "../models/Catalog";

export const seedCatalog = async () => {
  const count = await Catalog.countDocuments();

  if (count > 0) {
    ("Pizza Catalog is already seeded");
    return;
  }

  await Catalog.insertMany([
    {
      name: "Margherita",
      description: "Classic cheese and tomato sauce",
      price: 299,
    },
    {
      name: "Pepperoni",
      description: "Loaded with spicy pepperoni and mozzarella",
      price: 399,
    },
    {
      name: "Farmhouse",
      description: "Onion, capsicum, tomato, and mushrooms",
      price: 349,
    },
    {
      name: "Veggie Delight",
      description: "Sweet corn, olives, onions, and bell peppers",
      price: 329,
    },
    {
      name: "BBQ Chicken",
      description: "Grilled chicken with smoky BBQ sauce",
      price: 449,
    },
    {
      name: "Paneer Tikka",
      description: "Spicy paneer cubes with onions and capsicum",
      price: 379,
    },
    {
      name: "Hawaiian",
      description: "Ham and pineapple on a cheesy base",
      price: 429,
    },
    {
      name: "Mexican Fiesta",
      description: "Jalapeños, beans, onions, and spicy sauce",
      price: 359,
    },
    {
      name: "Four Cheese",
      description: "Mozzarella, cheddar, parmesan, and gouda",
      price: 459,
    },
    {
      name: "Chicken Supreme",
      description: "Chicken, olives, onions, and bell peppers",
      price: 469,
    },
    {
      name: "Mushroom Magic",
      description: "Fresh mushrooms with garlic and herbs",
      price: 319,
    },
    {
      name: "Spicy Veg Overload",
      description: "Capsicum, jalapeños, onions, red paprika",
      price: 349,
    },
    {
      name: "Cheese Burst",
      description: "Extra cheesy crust with rich mozzarella",
      price: 389,
    },
    {
      name: "Tandoori Chicken",
      description: "Tandoori chicken with onions and mint sauce",
      price: 479,
    },
    {
      name: "Italian Classic",
      description: "Tomatoes, basil, olives, and mozzarella",
      price: 339,
    },
    {
      name: "Peri Peri Chicken",
      description: "Spicy peri peri chicken with cheese",
      price: 459,
    },
    {
      name: "Spinach & Corn",
      description: "Healthy spinach with sweet corn and cheese",
      price: 319,
    },
    {
      name: "Meat Lovers",
      description: "Pepperoni, sausage, ham, and chicken",
      price: 499,
    },
    {
      name: "Garlic Parmesan",
      description: "Garlic sauce with parmesan and herbs",
      price: 309,
    },
    {
      name: "Classic Veg",
      description: "Simple veggies with classic tomato base",
      price: 299,
    },
  ]);

  ("Pizza catalog seeded");
};
