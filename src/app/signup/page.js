'use client';
export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSignup = async () => {
        const res = await signup({ name, email, password });
        if (res.success) {
            router.push('/login');
        }
    };


    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card p-4 col-12 col-sm-8 col-md-5 col-lg-4">
                <h4 className="text-center mb-4">Sign Up</h4>


                <input
                    className="form-control mb-3"
                    placeholder="Full Name"
                    onChange={(e) => setName(e.target.value)}
                />


                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />


                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />


                <button className="btn btn-primary w-100 mb-3" onClick={handleSignup}>
                    Create Account
                </button>


                <p className="text-center mb-0">
                    Already have an account?{' '}
                    <span
                        className="text-primary"
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}