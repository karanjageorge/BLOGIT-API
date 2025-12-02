import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

function Home() {
  const navigate = useNavigate();
  const [userName] = useState<string | null>(() => {
    return localStorage.getItem("userName") || null;
  });

  // Tailwind classes used:
  // primaryBtn - main CTA
  // secondaryBtn - less-emphasized action
  // ghostBtn - minimal button
  const primaryBtn = "bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800 focus:ring-2 focus:ring-sky-300 transition rounded-md";
  const secondaryBtn = "bg-white text-sky-600 border border-sky-200 hover:bg-sky-50 focus:ring-2 focus:ring-sky-200 transition rounded-md";
  const ghostBtn = "text-sky-700 hover:bg-sky-100 focus:ring-2 focus:ring-sky-100 transition rounded-md";
  const smallBtn = "px-3 py-1.5 text-sm";

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-100 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <Card className="bg-white/80 shadow-lg">
            <CardContent className="p-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3 text-slate-900">
                BLOGIT
              </h1>
              <p className="text-slate-600 mb-6">
                A simple, friendly place to write and share your thoughts. Quick to start — register,
                create posts, and manage your profile.
              </p>

              <div className="flex flex-wrap gap-3">
                {!userName ? (
                  <>
                    <Button className={`${primaryBtn} ${smallBtn}`} onClick={() => navigate("/register")}>Get started</Button>
                    <Button className={`${secondaryBtn} ${smallBtn}`} onClick={() => navigate("/login")}>Sign in</Button>
                  </>
                ) : (
                  <Button className={`${primaryBtn} ${smallBtn}`} onClick={() => navigate("/dashboard")}>Go to dashboard</Button>
                )}

                <Button className={`${ghostBtn} ${smallBtn}`} onClick={() => navigate("/dashboard")}>Explore</Button>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg bg-gradient-to-tr from-white to-sky-50 p-6 shadow-md">
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-lg bg-sky-50 border border-sky-100">
                <h3 className="text-lg font-semibold text-slate-800">Welcome{userName ? `, ${userName}` : ""}!</h3>
                <p className="text-sm text-slate-600">Create posts, edit your profile, and manage deleted items.</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-md border">
                  <div>
                    <div className="text-sm font-medium text-slate-800">Create new blog</div>
                    <div className="text-xs text-slate-500">Write and publish in seconds</div>
                  </div>
                  <Button className={`${primaryBtn} ${smallBtn}`} size="sm" onClick={() => navigate("/login")}>Create</Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-md border">
                  <div>
                    <div className="text-sm font-medium text-slate-800">Manage posts</div>
                    <div className="text-xs text-slate-500">Edit or soft-delete blogs</div>
                  </div>
                  <Button className={`${secondaryBtn} ${smallBtn}`} size="sm" onClick={() => navigate("/login")}>Manage</Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-md border">
                  <div>
                    <div className="text-sm font-medium text-slate-800">Edit profile</div>
                    <div className="text-xs text-slate-500">Update details & logout</div>
                  </div>
                  <Button className={`${ghostBtn} ${smallBtn}`} size="sm" onClick={() => navigate("/login")}>Profile</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature strip */}
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="flex-1 text-center p-6">
            <CardHeader>
              <CardTitle className="text-lg">Fast setup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">Register and start writing immediately.</p>
            </CardContent>
          </Card>

          <Card className="flex-1 text-center p-6">
            <CardHeader>
              <CardTitle className="text-lg">User-first</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">Profile, blog management and soft-deletes.</p>
            </CardContent>
          </Card>

          <Card className="flex-1 text-center p-6">
            <CardHeader>
              <CardTitle className="text-lg">Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">Authentication-ready with token storage.</p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} BLOGIT —@ Crafted with care by George Karanja ❤️
        </footer>
      </div>
    </div>
  );
}
export default Home;