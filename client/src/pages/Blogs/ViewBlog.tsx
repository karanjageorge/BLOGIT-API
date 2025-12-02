import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../lib/axiosApi";
import { toast } from "sonner";
import DashboardSidebar from "../../components/SideBar";

export default function ViewBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await api.get(`/blogs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const trashMutation = useMutation({
    mutationFn: async () => api.patch(`/blogs/trash/${id}`),
    onSuccess: () => {
      toast.success("Moved to Trash");
      navigate("/blogs/myblogs");
    },
  });

  if (!id) return <p className="p-4 text-red-500">Invalid blog ID</p>;
  if (isPending) return <p>Loading...</p>;

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold">{data.blogTitle}</h1>

        <p className="mt-3 text-gray-600">{data.blogSynopsis}</p>

        {data.featuredImageUrl && (
          <img
            src={data.featuredImageUrl}
            className="w-full h-[350px] object-cover rounded mt-4"
          />
        )}

        <div className="mt-6 prose max-w-none">{data.blogContent}</div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate(`/blogs/edit/${id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => trashMutation.mutate()}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Move to Trash
          </button>
        </div>
      </div>
    </div>
  );
}
