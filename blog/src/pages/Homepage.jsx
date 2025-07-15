import { useState, useEffect } from "react";

export default function Homepage() {
    const [isuser, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const UserFind = async () => {
        setLoading(true);
        const userStr = localStorage.getItem("user");
        if (userStr) {
            const userObj = JSON.parse(userStr);
            setUser(userObj);
        }
        setLoading(false);
    };

    useEffect(() => {
        UserFind();
    }, []);

    return (
        <div>
            <p>Home page</p>
        </div>
    );
}
