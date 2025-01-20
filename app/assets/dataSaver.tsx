'use client';

import React, { useState } from 'react';
import { supabase } from '@/app/assets/supabaseClient';

interface SaveDataProps {
    tableName: string; // Название таблицы, куда будут сохраняться данные
    data: Record<string, any>; // Данные для сохранения
    onSuccess?: () => void; // Коллбэк при успешном сохранении
    onError?: (error: any) => void; // Коллбэк при ошибке
}

const SaveData = ({ tableName, data, onSuccess, onError }: SaveDataProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.from(tableName).insert([data]);

            if (error) {
                setError(error.message);
                if (onError) onError(error);
            } else {
                if (onSuccess) onSuccess();
            }
        } catch (err) {
            setError('Не удалось сохранить данные. Попробуйте позже.');
            if (onError) onError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleSave}
                disabled={isLoading}
                className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
            >
                {isLoading ? 'Сохранение...' : 'Сохранить данные'}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
    );
};

export default SaveData;