import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import { useEffect, useState } from "react";
import { db } from "../db/db.js"

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const { groupId } = useParams(); 
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (user && groupId) {
        const membership = await db.memberships
          .where({ userId: user.id, groupId: Number(groupId) })
          .first();

        if (membership) {
          setRole(membership.role);
        }
      }
      setLoading(false);
    };

    fetchRole();
  }, [user, groupId]);

  // Not logged in redirects to the log in page
  if (!user) {
    return <Navigate to="/log-in" replace />;
  }

  // Still loading 
  if (loading) {
    return <p>Checking permissions...</p>;
  }

  // No membership found or role not allowed, blocks access
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // If Role allowed  renders  child
  return children;
};

export default RoleBasedRoute;
