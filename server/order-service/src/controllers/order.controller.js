import Order from "../models/order.model.js";
import getCouponByCode from "../services/getCouponByCode.js";




export const createOrder = async (req, res) => {
    try {
        const { couponCode, items, user, address, payment } = req.body;
    
        // Calculate itemsTotal
        const itemsTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
        // Initialize coupon
        let coupon = null;
        let applyDiscount = false;
    
        if (couponCode) {
            try {
                // Call Coupon Service to get coupon details
                const couponData = await getCouponByCode(couponCode);
    
                if (couponData) {
                    if (couponData.minimumOrderAmount <= itemsTotal) {
                        // Valid coupon that meets the minimum order amount
                        coupon = couponData;
                        applyDiscount = true;
                    }
                    // No action is taken for minimum order amount issues; the discount is not applied
                } else {
                    // Invalid or expired coupon; discount will not be applied
                }
            } catch (error) {
                console.error('Error retrieving coupon details:', error.message);
                // Proceed with order creation even if there's an error retrieving coupon details
            }
        }
    
        // Calculate totalPrice
        let totalPrice = itemsTotal;
        if (applyDiscount && coupon) {
            if (coupon.discountType === 'percentage') {
                totalPrice = itemsTotal * (1 - coupon.discountValue / 100);
            } else if (coupon.discountType === 'fixed') {
                totalPrice = Math.max(itemsTotal - coupon.discountValue, 0);
            }
        }
    
        // Create and save order
        const order = new Order({
            user,
            items,
            totalPrice,
            address,
            payment,
            coupon: coupon ? coupon._id : null
        });
    
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).send('Error creating order');
    }
}