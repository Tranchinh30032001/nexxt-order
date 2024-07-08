"use client";

import { useLogoutMutation } from "@/services/auth";
import { handleErrorApi } from "@/utils/common";
import { DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import React from "react";

const ButtonLogout = () => {
  const logoutMutation = useLogoutMutation();
  const handleLogout = async () => {
    if (logoutMutation.isPending) return;
    try {
      await logoutMutation.mutateAsync();
      location.href = '/login'
    } catch (error) {
      handleErrorApi({
        error
      });
    }
  };
  return (
    <DropdownMenuGroup onClick={handleLogout} className="cursor-pointer pl-2">
      <DropdownMenuItem>
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};

export default ButtonLogout;
