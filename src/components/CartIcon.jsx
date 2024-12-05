import { useStore } from "../store/cart";
import cartImage from "../assets/cart.png";
import PropTypes from "prop-types";

export const CartIcon = ({ iconSize = 30, badgeSize = 12 }) => {
  // Hämta varukorgen från state
  const cart = useStore((state) => state.cart || []); // Fallback till tom array

  // Beräkna antalet produkter i varukorgen
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Logga ut state för debugging
  console.log("Cart content:", cart);
  console.log("Total items:", totalItems);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: iconSize, height: iconSize }}
    >
      <img
        src={cartImage}
        alt="Cart"
        className="block"
        style={{ width: iconSize, height: iconSize }}
      />
      {totalItems > 0 && (
        <span
          className="absolute bg-red-500 text-white font-bold flex items-center justify-center rounded-full"
          style={{
            width: badgeSize * 2,
            height: badgeSize * 2,
            fontSize: badgeSize - 4,
            top: -badgeSize / 2,
            right: -badgeSize / 2,
          }}
        >
          {totalItems}
        </span>
      )}
    </div>
  );
};

// Prop-types validering
CartIcon.propTypes = {
  iconSize: PropTypes.number, // Storlek på ikon
  badgeSize: PropTypes.number, // Storlek på badge
};
