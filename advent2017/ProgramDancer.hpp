#include <string>

namespace Advent2017
{
    class ProgramDancer
    {
    public:
        static void DanceWithNumberOfProgramsAndMoveListAndReturnFinalPositions(
                        size_t numberOfPrograms, const char *moveList, std::string& finalPositions,
                        unsigned numberOfDances = 1)
        {
            char result[26 + 1] = { 0 };
            char programName = 'a';
            for (size_t idx = 0; idx < numberOfPrograms && idx < _countof(result) - 1; ++idx)
                result[idx] = programName++;

            for (unsigned danceNumber = 0; danceNumber < numberOfDances; ++danceNumber)
            {
                char mutableMoveList[100 * 1000] = { 0 };
                (void)strcpy_s(mutableMoveList, _countof(mutableMoveList), moveList);
                char *context = nullptr;
                auto moveToken = strtok_s(mutableMoveList, " ,", &context);
                while (moveToken != nullptr)
                {
                    if (moveToken[0] == 's') // Spin
                    {
                        char newResult[26 + 1] = { 0 };
                        auto numberOfProgramsToMoveToFront = (size_t)atoi(moveToken + 1);
                        auto indexOfFirst = strlen(result) - numberOfProgramsToMoveToFront;
                        size_t dstIdx = 0;
                        for (size_t srcIdx = indexOfFirst; srcIdx < strlen(result); ++srcIdx)
                            newResult[dstIdx++] = result[srcIdx];
                        for (size_t srcIdx = 0; srcIdx < indexOfFirst; ++srcIdx)
                            newResult[dstIdx++] = result[srcIdx];
                        (void)strcpy_s(result, _countof(result) - 1, newResult);
                    }
                    if (moveToken[0] == 'x') // eXchange
                    {
                        size_t firstPosition = 0, secondPosition = 0;
                        (void)sscanf_s(moveToken + 1, "%zu/%zu", &firstPosition, &secondPosition);
                        auto savedValue = result[firstPosition];
                        result[firstPosition] = result[secondPosition];
                        result[secondPosition] = savedValue;
                    }
                    if (moveToken[0] == 'p') // Partner
                    {
                        auto firstPosition = strrchr(result, moveToken[1]) - result;
                        auto secondPosition = strrchr(result, moveToken[3]) - result;
                        auto savedValue = result[firstPosition];
                        result[firstPosition] = result[secondPosition];
                        result[secondPosition] = savedValue;
                    }

                    moveToken = strtok_s(nullptr, " ,", &context);
                }
            }

            finalPositions.clear();
            finalPositions.append(result);
        }

    //private:
    };
}
