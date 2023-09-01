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
      profiles: {
        Row: {
          avatar_url: string
          full_name: string
          id: string
          updated_at: string | null
          username: string
          website: string | null
        }
        Insert: {
          avatar_url: string
          full_name: string
          id: string
          updated_at?: string | null
          username: string
          website?: string | null
        }
        Update: {
          avatar_url?: string
          full_name?: string
          id?: string
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
          id: string
          project: number | null
          status: Database["public"]["Enums"]["task_status"] | null
          task: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          project?: number | null
          status?: Database["public"]["Enums"]["task_status"] | null
          task?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          project?: number | null
          status?: Database["public"]["Enums"]["task_status"] | null
          task?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_fkey"
            columns: ["project"]
            referencedRelation: "projects"
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
      teste: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
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
      task_status: "BACKLOG" | "PENDING" | "IN PROGRESS" | "COMPLETED" | "TO DO"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
