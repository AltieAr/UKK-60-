import authService from "../services/authService.js";

class AuthController {
    async login(req, res) {
        const { username, password } = req.body;

        try {
            const result = await authService.login(username, password);
            res.status(200).json({
                message: 'Login successful',
                token: result.token,
                userData: result.userData
            });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

export default new AuthController();