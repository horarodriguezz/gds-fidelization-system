export default function getAvatarInfo(firstName: string, lastName?: string) {
  const initials = `${firstName[0]}${lastName?.[0] || ""}`.toUpperCase();

  const colors = [
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-purple-100", text: "text-purple-700" },
    { bg: "bg-green-100", text: "text-green-700" },
    { bg: "bg-orange-100", text: "text-orange-700" },
    { bg: "bg-pink-100", text: "text-pink-700" },
    { bg: "bg-cyan-100", text: "text-cyan-700" },
    { bg: "bg-amber-100", text: "text-amber-700" },
    { bg: "bg-emerald-100", text: "text-emerald-700" },
  ];

  const index =
    (firstName.charCodeAt(0) + (lastName?.charCodeAt(0) || 0)) % colors.length;

  return { initials, ...colors[index] };
}
