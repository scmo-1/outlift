export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      exercises: {
        Row: {
          archived_at: string | null
          body_part: string
          created_at: string
          created_by: string | null
          exercise_type: string
          id: string
          name: string
          nickname: string | null
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          body_part: string
          created_at?: string
          created_by?: string | null
          exercise_type: string
          id?: string
          name: string
          nickname?: string | null
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          body_part?: string
          created_at?: string
          created_by?: string | null
          exercise_type?: string
          id?: string
          name?: string
          nickname?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'exercises_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          username?: string
        }
        Relationships: []
      }
      program_workout_exercises: {
        Row: {
          exercise_id: string
          id: string
          in_workout_index: number
          rep_goal: number
          sets: number
          workout_id: string
        }
        Insert: {
          exercise_id: string
          id?: string
          in_workout_index: number
          rep_goal: number
          sets: number
          workout_id: string
        }
        Update: {
          exercise_id?: string
          id?: string
          in_workout_index?: number
          rep_goal?: number
          sets?: number
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'program_workout_exercises_exercise_id_fkey'
            columns: ['exercise_id']
            isOneToOne: false
            referencedRelation: 'exercises'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'program_workout_exercises_workout_id_fkey'
            columns: ['workout_id']
            isOneToOne: false
            referencedRelation: 'program_workouts'
            referencedColumns: ['id']
          },
        ]
      }
      program_workouts: {
        Row: {
          archived_at: string | null
          created_at: string
          id: string
          name: string
          order_index: number
          program_id: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          id?: string
          name: string
          order_index: number
          program_id: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          id?: string
          name?: string
          order_index?: number
          program_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'program_workouts_program_id_fkey'
            columns: ['program_id']
            isOneToOne: false
            referencedRelation: 'programs'
            referencedColumns: ['id']
          },
        ]
      }
      programs: {
        Row: {
          archived_at: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          profile_id: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          profile_id: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'programs_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      session_exercises: {
        Row: {
          exercise_id: string | null
          exercise_name: string
          id: string
          in_session_index: number
          planned_exercise_id: string | null
          session_id: string
        }
        Insert: {
          exercise_id?: string | null
          exercise_name: string
          id?: string
          in_session_index: number
          planned_exercise_id?: string | null
          session_id: string
        }
        Update: {
          exercise_id?: string | null
          exercise_name?: string
          id?: string
          in_session_index?: number
          planned_exercise_id?: string | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'session_exercises_exercise_id_fkey'
            columns: ['exercise_id']
            isOneToOne: false
            referencedRelation: 'exercises'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'session_exercises_planned_exercise_id_fkey'
            columns: ['planned_exercise_id']
            isOneToOne: false
            referencedRelation: 'program_workout_exercises'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'session_exercises_session_id_fkey'
            columns: ['session_id']
            isOneToOne: false
            referencedRelation: 'workout_sessions'
            referencedColumns: ['id']
          },
        ]
      }
      sets: {
        Row: {
          created_at: string
          id: string
          reps: number | null
          rir: number | null
          session_exercise_id: string
          set_index: number
          status: string
          weight: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          reps?: number | null
          rir?: number | null
          session_exercise_id: string
          set_index: number
          status?: string
          weight?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          reps?: number | null
          rir?: number | null
          session_exercise_id?: string
          set_index?: number
          status?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'sets_session_exercise_id_fkey'
            columns: ['session_exercise_id']
            isOneToOne: false
            referencedRelation: 'session_exercises'
            referencedColumns: ['id']
          },
        ]
      }
      workout_sessions: {
        Row: {
          created_at: string
          ended_at: string | null
          id: string
          profile_id: string
          started_at: string
          workout_id: string | null
        }
        Insert: {
          created_at?: string
          ended_at?: string | null
          id?: string
          profile_id: string
          started_at?: string
          workout_id?: string | null
        }
        Update: {
          created_at?: string
          ended_at?: string | null
          id?: string
          profile_id?: string
          started_at?: string
          workout_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'workout_sessions_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'workout_sessions_workout_id_fkey'
            columns: ['workout_id']
            isOneToOne: false
            referencedRelation: 'program_workouts'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_program_with_workouts: {
        Args: {
          p_profile_id: string
          p_program_name: string
          p_workouts: Json
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
