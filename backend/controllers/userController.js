import supabase from '../supabaseClient.js';

// GET /user/profile/:id
export const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch user using Supabase Admin API
    const { data, error } = await supabase.auth.admin.getUserById(id);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    const user = data?.user;

    // Log for debugging
    console.log("Fetched user from Supabase:", {
      id: user.id,
      user_metadata: user.user_metadata
    });

    const name = user?.raw_user_meta_data?.name?.trim() || "User";

    // Respond with just the data needed
    res.json({ id: user.id, name });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

