import api from "../services/api";
import { getItem } from "./storage";
export async function LoadTransactions() {
    const token = getItem('token')
    try {
        await api.get('/transacao', { headers: { Authorization: `Bearer ${token}` } })
    } catch (error) {
        console.log(error.message);
    }
}