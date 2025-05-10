import supabase from '../supabaseClient.js';

export const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { name },
    email_confirm: true // Optional, skip email confirmation
  });

  if (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "User created successfully", user: data.user });
};

// // Login controller
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   const { data, error } = await supabase.auth.signInWithPassword({ email, password });

//   if (error) return res.status(401).json({ error: 'Invalid credentials' });
//   res.json({ user: data.user, session: data.session });
// };

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(401).json({ error: 'Invalid credentials' });

  const userId = data.user.id;
  const { data: userInfo, error: userErr } = await supabase.auth.admin.getUserById(userId);

  if (userErr) return res.status(500).json({ error: 'Failed to fetch user details' });

  res.json({ user: userInfo.user, session: data.session });
};

