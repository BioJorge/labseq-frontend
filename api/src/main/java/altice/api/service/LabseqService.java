package altice.api.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class LabseqService {

    private final Map<Integer, Long> cache = new HashMap<>();

    public LabseqService() {
        // Inicializar o cache com os casos base
        cache.put(0, 0L);
        cache.put(1, 1L);
        cache.put(2, 0L);
        cache.put(3, 1L);
    }

    public long calculateLabseq(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n deve ser não-negativo");
        }

        if (cache.containsKey(n)) {
            return cache.get(n);
        }

        // Calcular valores intermediários se necessário
        for (int i = 4; i <= n; i++) {
            if (!cache.containsKey(i)) {
                long value = cache.get(i - 4) + cache.get(i - 3);
                cache.put(i, value);
            }
        }

        return cache.get(n);
    }
}