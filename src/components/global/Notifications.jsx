import React, { useState, useRef, useEffect } from "react";
import { BellIcon } from "lucide-react";
import { useGetNotificationsQuery, useMarkNotificationsAsReadMutation } from "../../backend/features/postuler/postulerAPI";

export default function Notifications({ etabId }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: notifications = [], isLoading } = useGetNotificationsQuery(etabId, {
    pollingInterval: 10000,
  });

  const [markAsRead] = useMarkNotificationsAsReadMutation();

  const unreadCount = notifications?.results?.filter((n) => !n.is_read).length;

  // Fermer dropdown si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Marquer comme lu quand on ouvre
  useEffect(() => {
    if (open && unreadCount > 0) {
      markAsRead(etabId);
    }
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
        <BellIcon size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-md shadow-lg z-50 border max-h-96 overflow-y-auto">
          <div className="p-2 border-b font-semibold">Notifications</div>
          {isLoading ? (
            <p className="p-2 text-gray-500 text-sm">Chargement...</p>
          ) : notifications?.results?.length === 0 ? (
            <p className="p-2 text-gray-500 text-sm">Aucune notification</p>
          ) : (
            <ul className="divide-y">
              {notifications?.results.map((notif) => (
                <li key={notif.id} className="p-2 hover:bg-gray-50">
                  <p className="text-sm">{notif.message}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(notif.created_at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
