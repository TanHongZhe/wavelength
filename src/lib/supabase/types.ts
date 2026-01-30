export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            rooms: {
                Row: {
                    clue: string | null
                    created_at: string
                    current_card: Json | null
                    guess_angle: number | null
                    guesser_id: string | null
                    guesser_score: number | null
                    id: string
                    phase: string | null
                    psychic_id: string | null
                    psychic_score: number | null
                    room_code: string
                    round_number: number | null
                    target_angle: number | null
                    updated_at: string
                    player1_name: string | null
                    player2_name: string | null
                    player1_avatar: string | null
                    player2_avatar: string | null
                    game_mode: string | null
                }
                Insert: {
                    clue?: string | null
                    created_at?: string
                    current_card?: Json | null
                    guess_angle?: number | null
                    guesser_id?: string | null
                    guesser_score?: number | null
                    id?: string
                    phase?: string | null
                    psychic_id?: string | null
                    psychic_score?: number | null
                    room_code: string
                    round_number?: number | null
                    target_angle?: number | null
                    updated_at?: string
                    player1_name?: string | null
                    player2_name?: string | null
                    player1_avatar?: string | null
                    player2_avatar?: string | null
                    game_mode?: string | null
                }
                Update: {
                    clue?: string | null
                    created_at?: string
                    current_card?: Json | null
                    guess_angle?: number | null
                    guesser_id?: string | null
                    guesser_score?: number | null
                    id?: string
                    phase?: string | null
                    psychic_id?: string | null
                    psychic_score?: number | null
                    room_code?: string
                    round_number?: number | null
                    target_angle?: number | null
                    updated_at?: string
                    player1_name?: string | null
                    player2_name?: string | null
                    player1_avatar?: string | null
                    player2_avatar?: string | null
                    game_mode?: string | null
                }
                Relationships: []
            }
            party_players: {
                Row: {
                    id: string
                    room_id: string
                    player_id: string
                    name: string
                    avatar: string
                    role: "psychic" | "guesser"
                    score: number
                    guess_angle: number | null
                    locked_in: boolean
                    joined_at: string
                }
                Insert: {
                    id?: string
                    room_id: string
                    player_id: string
                    name: string
                    avatar: string
                    role: "psychic" | "guesser"
                    score?: number
                    guess_angle?: number | null
                    locked_in?: boolean
                    joined_at?: string
                }
                Update: {
                    id?: string
                    room_id?: string
                    player_id?: string
                    name?: string
                    avatar?: string
                    role?: "psychic" | "guesser"
                    score?: number
                    guess_angle?: number | null
                    locked_in?: boolean
                    joined_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "party_players_room_id_fkey"
                        columns: ["room_id"]
                        referencedRelation: "rooms"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            cleanup_old_rooms: { Args: never; Returns: undefined }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
    public: {
        Enums: {},
    },
} as const
