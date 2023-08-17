export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      link_project: {
        Row: {
          created_at: string
          id: number
          project_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          project_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          project_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "link_project_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "link_project_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string
          full_name: string
          id: string
          link_project: number | null
          updated_at: string | null
          username: string
          website: string | null
        }
        Insert: {
          avatar_url: string
          full_name: string
          id: string
          link_project?: number | null
          updated_at?: string | null
          username: string
          website?: string | null
        }
        Update: {
          avatar_url?: string
          full_name?: string
          id?: string
          link_project?: number | null
          updated_at?: string | null
          username?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_link_project_fkey"
            columns: ["link_project"]
            referencedRelation: "link_project"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          color: Database["public"]["Enums"]["color_bg_enum"]
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          color: Database["public"]["Enums"]["color_bg_enum"]
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          color?: Database["public"]["Enums"]["color_bg_enum"]
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string | null
          done: boolean | null
          id: string
          project_id: number | null
          status: Database["public"]["Enums"]["task_status"] | null
          task: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          done?: boolean | null
          id?: string
          project_id?: number | null
          status?: Database["public"]["Enums"]["task_status"] | null
          task?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          done?: boolean | null
          id?: string
          project_id?: number | null
          status?: Database["public"]["Enums"]["task_status"] | null
          task?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "link_project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      color_bg_enum: "bg-info" | "bg-success" | "bg-warning" | "bg-error"
      color_enum: "info" | "success" | "warning" | "error"
      task_status: "backlog" | "pending" | "in progress" | "completed" | "to do"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
