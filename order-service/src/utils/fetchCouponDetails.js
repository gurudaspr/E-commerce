import axios from 'axios';

async function fetchCouponDetails(couponCode) {
    try {
        const response = await axios.get(`{process.env.COUPON_SERVICE_URL}/api/v1/coupons/${couponCode}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching coupon details:', error.message);
        return null;
    }
}

export default fetchCouponDetails;